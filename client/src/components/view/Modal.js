import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';
import { mixins, theme } from '../../styles';
const { colors, spacing } = theme;

const ModalMask = styled.div`
  ${mixins.engulf}
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  ${mixins.flexCenter}
`;

const ModalContainer = styled.div`
  position: absolute;
  min-height: 200px;
  min-width: 200px;
  background-color: ${colors.white};
  padding: ${spacing.base};
  color: ${colors.black};
  ${mixins.shadow}
  border-radius: 10px;
`;

const Modal = ({ header, body, footer }) => {
  return (
    <ModalMask>
      <ModalContainer>
        {header && <div className="modal-header">{header}</div>}
        {body && <div className="modal-header">{body}</div>}
        {footer && <div className="modal-header">{footer}</div>}
      </ModalContainer>
    </ModalMask>
  );
};

Modal.propTypes = {
  header: PropTypes.node || PropTypes.string,
  unfollow: PropTypes.bool,
  removePlayList: PropTypes.func,
  audioFeatures: PropTypes.object,
};
export default Modal;
