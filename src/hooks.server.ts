/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	// @ts-ignore
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	const response = await resolve(event);

	if (!cookies['userid']) {
		response.headers.set(
			'set-cookie',
			// @ts-ignore
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};
