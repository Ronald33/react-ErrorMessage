# ErrorMessage

Plugin para mostrar mensajes de error por campo en formularios React.

---

## ¿Qué es?

`ErrorMessage` muestra el mensaje de error asociado a un campo específico de un formulario. Recibe el objeto de errores y el nombre del campo, y renderiza el mensaje solo si existe un error para ese campo.

---

## Archivos

```
ErrorMessage/
├── DefaultErrorMessage.jsx
├── ErrorMessage.jsx
└── index.js
```

---

## Instalación

Copia la carpeta `ErrorMessage` en tu proyecto e impórtala donde la necesites:

```js
import { ErrorMessage } from "./ErrorMessage"
```

---

## Uso

### Props

| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `errors` | object | Sí | Objeto de errores del formulario |
| `name` | string | Sí | Nombre del campo a mostrar |
| `component` | Component | No | Reemplaza el visual solo en esta instancia |

### Ejemplo básico con React Hook Form

```jsx
import { useForm } from "react-hook-form"
import { ErrorMessage } from "./ErrorMessage"

const CategoriaForm = () =>
{
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("nombre", { required: "El nombre es requerido." })}
                placeholder="Nombre de la categoría"
            />
            <ErrorMessage errors={errors} name="nombre" />

            <button type="submit">Guardar</button>
        </form>
    )
}
```

Si el campo `nombre` tiene un error, `ErrorMessage` lo mostrará automáticamente. Si no hay error, no renderiza nada.

---

## Personalización del componente

El archivo `DefaultErrorMessage.jsx` **no debe modificarse**. Para cambiar el diseño existen dos opciones:

| Prioridad | Opción | Alcance |
|---|---|---|
| 1 (menor) | `ErrorMessage.setComponent()` | Global, reemplaza el default en toda la app |
| 2 (mayor) | Prop `component` en `ErrorMessage` | Solo esa instancia, pisa al global |

### Opción 1 — `setComponent()` (global)

Reemplaza el componente por defecto en toda la app. Ideal para definir un diseño consistente desde un archivo de configuración central:

```js
// config.js
import { ErrorMessage } from "./ErrorMessage"
import MyErrorMessage from "./MyErrorMessage"

ErrorMessage.setComponent(MyErrorMessage)
```

### Opción 2 — Prop `component` (solo esa instancia, pisa al global)

Cuando una instancia puntual necesita un diseño diferente al global:

```jsx
<ErrorMessage errors={errors} name="nombre" component={MyErrorMessage} />
```

---

## Contrato del componente personalizado

El componente personalizado recibe la prop `message` con el texto del error:

```jsx
// MyErrorMessage.jsx
const MyErrorMessage = ({ message }) => (
    <span style={{ color: "red", fontSize: "12px" }}>
        ⚠️ {message}
    </span>
)

export default MyErrorMessage
```

---

## Notas importantes

- Si no se pasa el prop `name`, el componente no renderiza nada y lanza un error en consola.
- Si no se pasa el prop `errors`, el componente no renderiza nada y lanza un error en consola.
- Si el campo no tiene error, el componente no renderiza nada.