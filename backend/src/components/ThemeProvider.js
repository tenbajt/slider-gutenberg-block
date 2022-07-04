import { ThemeProvider } from "styled-components";

const themeProps = {
    borderRadius: 'calc(0.375rem + 0.375vw)',
}

export default function Theme({ children }) {
    return (
        <ThemeProvider theme={themeProps}>
            {children}
        </ThemeProvider>
    )
}