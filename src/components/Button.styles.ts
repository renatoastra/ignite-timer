import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant: ButtonVariant
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'gree,'

};

export const ButtonContainer = styled.button<ButtonContainerProps>`

    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;
    color: ${props => props.theme["gray-100"]};
    background-color: ${props => props.theme["green-500"]};

    /* ${props => {
        console.log("🚀 ~ buttonVariants", buttonVariants)
        return css`background-color: ${buttonVariants[props.variant]}`
    }} */

`;