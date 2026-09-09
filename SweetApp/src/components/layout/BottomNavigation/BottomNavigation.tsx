import { useCart } from '../../../context/useCart';
import type { TabType } from '../../../context/CartContext';
import './BottomNavigation.css';

interface BottomNavigationProps {
    activeTab?: TabType;
    onTabChange?: (tab: TabType) => void;
}

export function BottomNavigation({
    activeTab: externalActiveTab,
    onTabChange,
}: BottomNavigationProps) {
    const { activeTab: contextActiveTab, setActiveTab: setContextActiveTab } = useCart();

    const currentTab = externalActiveTab ?? contextActiveTab;

    const handleSelect = (tab: TabType) => {
        if (onTabChange) {
            onTabChange(tab);
        } else {
            setContextActiveTab(tab);
        }
    };

    return (
        <nav className="bottom-nav" aria-label="Navegação inferior">
            <button
                type="button"
                className={`bottom-nav__item ${
                    currentTab === 'menu' ? 'bottom-nav__item--active' : ''
                }`}
                onClick={() => handleSelect('menu')}
            >
                <div className="bottom-nav__icon-box">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>
                <span className="bottom-nav__label">Cardápio</span>
            </button>

            <button
                type="button"
                className={`bottom-nav__item ${
                    currentTab === 'orders' ? 'bottom-nav__item--active' : ''
                }`}
                onClick={() => handleSelect('orders')}
            >
                <div className="bottom-nav__icon-box">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        <line x1="9" y1="11" x2="15" y2="11" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                </div>
                <span className="bottom-nav__label">Pedidos</span>
            </button>

            <button
                type="button"
                className={`bottom-nav__item ${
                    currentTab === 'contact' ? 'bottom-nav__item--active' : ''
                }`}
                onClick={() => handleSelect('contact')}
            >
                <div className="bottom-nav__icon-box">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                </div>
                <span className="bottom-nav__label">Contato</span>
            </button>

            <button
                type="button"
                className={`bottom-nav__item ${
                    currentTab === 'profile' ? 'bottom-nav__item--active' : ''
                }`}
                onClick={() => handleSelect('profile')}
            >
                <div className="bottom-nav__icon-box">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <span className="bottom-nav__label">Perfil</span>
            </button>
        </nav>
    );
}
