import { useState } from 'react';
import './Profile.css';

export function Profile() {
    const [notifyFreshBake, setNotifyFreshBake] = useState(true);
    const [notifyDiscounts, setNotifyDiscounts] = useState(true);

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    <span>👩‍🍳</span>
                </div>
                <h2 className="profile-name">Kami Silva</h2>
                <p className="profile-email">kami@sweetsbykami.com.br</p>

                <div className="profile-vip-badge">
                    <span>🎀 Membro VIP • 380 Pontos Doces</span>
                </div>
            </div>

            {/* SEÇÃO ENDEREÇOS */}
            <div className="profile-card">
                <div className="profile-card__title-row">
                    <h3>Endereços Salvos</h3>
                    <button type="button" className="profile-card__btn-add">+ Novo</button>
                </div>

                <div className="profile-address-item">
                    <span className="profile-address-item__icon">🏠</span>
                    <div className="profile-address-item__details">
                        <strong>Casa (Padrão)</strong>
                        <p>Rua das Flores, 45 - Apto 102 • Jardins</p>
                    </div>
                </div>

                <div className="profile-address-item">
                    <span className="profile-address-item__icon">🏢</span>
                    <div className="profile-address-item__details">
                        <strong>Trabalho</strong>
                        <p>Av. Paulista, 1000 - 14º andar • Bela Vista</p>
                    </div>
                </div>
            </div>

            {/* SEÇÃO PAGAMENTOS */}
            <div className="profile-card">
                <div className="profile-card__title-row">
                    <h3>Formas de Pagamento</h3>
                    <button type="button" className="profile-card__btn-add">+ Adicionar</button>
                </div>

                <div className="profile-payment-item">
                    <span className="profile-payment-item__icon">⚡</span>
                    <div className="profile-payment-item__details">
                        <strong>Chave Pix</strong>
                        <p>kami@sweetsbykami.com.br</p>
                    </div>
                </div>

                <div className="profile-payment-item">
                    <span className="profile-payment-item__icon">💳</span>
                    <div className="profile-payment-item__details">
                        <strong>Mastercard Gold</strong>
                        <p>Final •••• 4321</p>
                    </div>
                </div>
            </div>

            {/* NOTIFICAÇÕES */}
            <div className="profile-card">
                <div className="profile-card__title-row">
                    <h3>Preferências</h3>
                </div>

                <div className="profile-toggle-row">
                    <div>
                        <strong>Avisos de fornada quente</strong>
                        <p>Receba quando sair bolo fresquinho</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={notifyFreshBake}
                            onChange={(e) => setNotifyFreshBake(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="profile-toggle-row">
                    <div>
                        <strong>Mimos de aniversário</strong>
                        <p>Cupons e brigadeiros de presente</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={notifyDiscounts}
                            onChange={(e) => setNotifyDiscounts(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
