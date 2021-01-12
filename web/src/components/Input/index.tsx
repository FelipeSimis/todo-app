import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle, FiEye, FiEyeOff, FiPlus } from 'react-icons/fi';

import ErrorTooltip from '../ErrorTooltip';

import { Button, Container, PasswordButton } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isPasswordField?: boolean;
  isLogin?: boolean;
}

const Input: React.FC<Props> = ({
  name,
  icon: Icon,
  isPasswordField,
  isLogin,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handlePasswordVisibility = useCallback(() => {
    setIsShowingPassword(state => !state);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      hasButton={!!isLogin}
    >
      <input
        ref={inputRef}
        id={fieldName}
        type={isShowingPassword ? 'text' : 'password'}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {Icon && <Icon size={20} />}

      {error && (
        <ErrorTooltip title={error}>
          <FiAlertCircle size={20} />
        </ErrorTooltip>
      )}

      {isPasswordField && (
        <PasswordButton type="button" onClick={handlePasswordVisibility}>
          {!isShowingPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </PasswordButton>
      )}

      {!isLogin && (
        <Button type="submit">
          <FiPlus />
        </Button>
      )}
    </Container>
  );
};

export default Input;
