'use strict'

const Wash = use('App/Models/Wash')

class WashController {
  /**
   * Show a list of all washes.
   * GET washes
   */
  async index ({ request }) {
    const { latitude, longitude } = request.all()

    const washes = Wash.query()
      .nearBy(latitude, longitude, 10)
      .fetch()

    return washes
  }

  /**
   * Create/save a new wash.
   * POST washes
   */
  async store ({ request, auth }) {
    const data = request.only([
      'category',
      'description',
      'address',
      'latitude',
      'longitude',
      'price'
    ]);

    const wash = await Wash.create({
      user_id: auth.user.id,
      ...data
    });

    return wash;
  }

  /**
   * Display a single wash.
   * GET washes/:id
   */
  async show ({ params }) {
    const wash = await Wash.findOrFail(params.id)

    await wash.load('images')

    return wash
  }

  /**
   * Update wash details.
   * PUT or PATCH washes/:id
   */
  async update ({ params, request, response }) {
    const wash = await Wash.findOrFail(params.id)

    if (wash.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'category',
      'description',
      'address',
      'latitude',
      'longitude',
      'price'
    ])

    wash.merge(data)

    await wash.save()

    return wash
  }
  /**
   * Delete a wash with id.
   * DELETE washes/:id
   */
  async destroy ({ params, auth, response }) {
    const wash = await Wash.findOrFail(params.id)

    if (wash.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await wash.delete()
  }
}

module.exports = WashController
