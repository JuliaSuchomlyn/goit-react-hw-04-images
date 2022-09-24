import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose])

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
        onClose();
        }
    };

        return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalImg>{children}</ModalImg>
        </Overlay>,
        modalRoot,
        );
    }

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};