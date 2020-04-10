'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')


Route.get('/washes', 'WashController.index')
Route.get('/washes/:id', 'WashController.show')

Route.post('/washes', 'WashController.store').middleware('auth')
Route.put('/washes/:id', 'WashController.update').middleware('auth')
Route.delete('/washes/:id', 'WashController.destroy').middleware('auth')
