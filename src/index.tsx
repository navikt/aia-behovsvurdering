import { createRoot } from 'react-dom/client';
import Mikrofrontend from './Mikrofrontend';

const root = createRoot(document.getElementById('maincontent') as HTMLElement);
root.render(<Mikrofrontend />);
