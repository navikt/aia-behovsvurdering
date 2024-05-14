import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
    ARBEIDSOKERPERIODER_URL,
    BEHOVSVURDERING_URL,
    OPPLYSNINGER_OM_ARBEIDSSOKER_URL,
    PROFILERING_URL,
    VEDTAKSSTOETTE_URL,
    MOTESTOTTE_URL,
} from './urls/api';
import arbeidssokerperioderMock from './mocks/arbeidssokerperioder-mock';
import opplysningerOmArbeidssokerMock from './mocks/opplysninger-om-arbeidssoker-mock';
import Mikrofrontend from './Mikrofrontend';
import behovsvurderingMock from './mocks/behovsvurdering-mock';
import vedtaksstoetteMock from './mocks/vedtaksstoette-mock';
import moetestoetteMock from './mocks/moetestoette-mock';

const defaultHandlers = [
    http.get(ARBEIDSOKERPERIODER_URL, () => {
        return HttpResponse.json(arbeidssokerperioderMock);
    }),
    http.get(`${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/*`, () => {
        return HttpResponse.json(opplysningerOmArbeidssokerMock);
    }),
    http.get(`${PROFILERING_URL}/*`, () => {
        return new HttpResponse(null, { status: 204 });
    }),
    http.get(BEHOVSVURDERING_URL, () => HttpResponse.json(behovsvurderingMock)),
    http.get(VEDTAKSSTOETTE_URL, () => HttpResponse.json(vedtaksstoetteMock)),
    http.get(MOTESTOTTE_URL, () => HttpResponse.json(moetestoetteMock)),
];

describe('Mikrofrontend', () => {
    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('rendrer AiA som microfrontend', async () => {
        server.use(...defaultHandlers);
        render(<Mikrofrontend />);

        await expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
    });
});
