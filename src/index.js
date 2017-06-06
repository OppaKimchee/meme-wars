import ReactDOM from 'react-dom';
import { makeMainRoutes } from './utils/routes/routes';
import './index.css';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));