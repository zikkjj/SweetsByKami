import { useState } from 'react';
import './Contact.css';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: 'Qual o prazo para encomendas de bolos inteiros?',
        answer: 'Recomendamos antecedência de pelo menos 24 horas para garantir que seu bolo seja preparado fresquinho.',
    },
    {
        question: 'Posso retirar pessoalmente no ateliê?',
        answer: 'Com certeza! Selecione a opção "Retirar no Ateliê" durante a confirmação do seu pedido sem custo algum.',
    },
];

export function Contact() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="contact-page">
            <div className="contact-page__header">
                <h2>Fale Conosco</h2>
                <p>Estamos prontos para te atender com todo o carinho</p>
            </div>

            {/* BOTÃO WHATSAPP PRINCIPAL */}
            <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20doces%20da%20La%20Douceur."
                target="_blank"
                rel="noreferrer"
                className="contact-whatsapp-btn"
            >
                <div className="contact-whatsapp-btn__icon">💬</div>
                <div className="contact-whatsapp-btn__text">
                    <strong>Atendimento via WhatsApp</strong>
                    <span>Resposta rápida de Seg a Dom • 09h às 20h</span>
                </div>
                <span className="contact-whatsapp-btn__arrow">→</span>
            </a>

            {/* INFORMAÇÕES DO ATELIÊ */}
            <div className="contact-info-card">
                <h3>Nosso Ateliê</h3>

                <div className="contact-info-item">
                    <span className="contact-info-item__icon">📍</span>
                    <div>
                        <strong>Localização</strong>
                        <p>Alameda dos Doces, 150 - Jardins, São Paulo/SP</p>
                    </div>
                </div>

                <div className="contact-info-item">
                    <span className="contact-info-item__icon">🕒</span>
                    <div>
                        <strong>Horário de Funcionamento</strong>
                        <p>Terça a Domingo: 10h às 19h (Segunda fechado)</p>
                    </div>
                </div>

                <div className="contact-info-item">
                    <span className="contact-info-item__icon">🎀</span>
                    <div>
                        <strong>Instagram</strong>
                        <p>@ladouceur.confeitaria</p>
                    </div>
                </div>
            </div>

            {/* DÚVIDAS FREQUENTES */}
            <div className="contact-faq">
                <h3>Dúvidas Frequentes</h3>

                <div className="contact-faq__list">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="contact-faq__item">
                                <button
                                    type="button"
                                    className="contact-faq__question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <span className="contact-faq__chevron">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="contact-faq__answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
