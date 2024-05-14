import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import fetcher from './http';

describe('fetcher', () => {
    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('kjører GET mot gitt url', async () => {
        server.use(
            http.get('http://localhost:8080/test-get-ok', () => {
                return HttpResponse.json('ok');
            }),
        );

        const result = await fetcher('http://localhost:8080/test-get-ok');
        expect(result).toEqual('ok');
    });

    test('håndterer 204 response', async () => {
        server.use(
            http.get('http://localhost:8080/test-204', () => {
                return new HttpResponse(null, { status: 204 });
            }),
        );

        const result = await fetcher('http://localhost:8080/test-204');
        expect(result).toBeNull();
    });

    test('sender headere', async () => {
        const spy = vi.fn();
        server.use(
            http.get('http://localhost:8080/headers', async ({ request }) => {
                request.headers.forEach((val, key) => {
                    spy({ [key]: val });
                });
                return HttpResponse.json({ result: 'ok' });
            }),
        );

        const result = await fetcher('http://localhost:8080/headers', {
            headers: {
                'Nav-Call-Id': '42',
            },
        });

        expect(spy).toHaveBeenCalledWith({
            'content-type': 'application/json',
        });
        expect(spy).toHaveBeenCalledWith({
            accept: 'application/json',
        });
        expect(spy).toHaveBeenCalledWith({
            'nav-call-id': '42',
        });
        expect(result).toEqual({ result: 'ok' });
    });

    test('håndterer POST', async () => {
        const spy = vi.fn();
        server.use(
            http.post('http://localhost:8080/post', async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json({ result: 'ok' });
            }),
        );

        const result = await fetcher('http://localhost:8080/post', {
            method: 'POST',
            body: JSON.stringify({ foo: 'bar' }),
        });

        expect(spy).toHaveBeenCalledWith({ foo: 'bar' });
        expect(result).toEqual({ result: 'ok' });
    });

    test('kaster feil med data', async () => {
        server.use(
            http.get('http://localhost:8080/feil', () => {
                return new HttpResponse(JSON.stringify({ error: true }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }),
        );

        try {
            await fetcher('http://localhost:8080/feil');
        } catch (err: any) {
            expect(err.status).toEqual(500);
            expect(err.data).toEqual({ error: true });
        }
    });
});
