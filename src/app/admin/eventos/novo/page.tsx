import { FormEvento } from "../FormEvento";

export default function NovoEvento() {
    // A proteção de Autenticação foi delegada globalmente ao Middleware no /admin
    return <FormEvento />;
}
