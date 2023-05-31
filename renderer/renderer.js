import goto from './routes/index.js';
import Routes from './routes/routes.enum.js';
import handleKeyPress from './services/keyboard.service.js';

// dashboard
document.addEventListener('keydown', handleKeyPress);

// game
goto(Routes.Welcome);
