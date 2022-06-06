'use strict'

import noteController from '../controllers/noteController.js'

export default [
	{
		method: 'GET',
		path: '/notes',
		handler: noteController.index
	},
	{
		method: 'POST',
		path: '/notes',
		handler: noteController.store
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: noteController.show
	},
	{
		method: ['PUT', 'PATCH'],
		path: '/notes/{id}',
		handler: noteController.update
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: noteController.remove
	}
]