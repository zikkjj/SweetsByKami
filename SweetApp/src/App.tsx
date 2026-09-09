import { CartProvider } from './context/CartProvider';
import { Menu } from './pages/Menu/Menu';

function App() {
    return (
        <CartProvider>
            <Menu />
        </CartProvider>
    );
}

export default App;