const carritoDeCompras = [];

const categorias = {
    Indumentaria,
    Zapatillas,
    Accesorios
};

// Saludo de bienvenida y petición del nombre
const nombreUsuario = prompt("¡Bienvenido/a! ¿Cuál es tu nombre?");

const elegirCategoria = () => {
    let categoriaElegida = '';
    do {
        categoriaElegida = prompt(`Hola ${nombreUsuario}, elige una categoría:\n1. Indumentaria\n2. Zapatillas\n3. Accesorios`);
        switch(categoriaElegida) {
            case '1':
                return 'Indumentaria';
            case '2':
                return 'Zapatillas';
            case '3':
                return 'Accesorios';
            default:
                alert("Opción no válida. Inténtalo de nuevo.");
                categoriaElegida = '';
        }
    } while (!categoriaElegida);
};

const listaMayorMenor = (categoria) => {
    categorias[categoria].sort((a, b) => b.precio - a.precio);
    listaCliente(categoria);
};

const listaCliente = (categoria) => {
    const listaOrdenada = categorias[categoria].map(producto => "- " + producto.nombre + " $" + producto.precio);
    compraCliente(listaOrdenada, categoria);
};

const compraCliente = (listaOrdenada, categoria) => {
    let productoNombre = "";
    let seguirComprando = false;

    do {
        productoNombre = prompt(`Hola ${nombreUsuario}, ¿qué te gustaría comprar?\n\n${listaOrdenada.join("\n")}`);

        const producto = categorias[categoria].find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());
        
        if (producto) {
            let talle = '';
            if (categoria !== 'Accesorios') {
                talle = prompt(`Elige el talle para ${producto.nombre} (Disponibles: ${producto.talles.join(", ")})`);
                if (categoria === 'Zapatillas') {
                    talle = parseInt(talle);
                } else {
                    talle = talle.toLowerCase();
                }
            }
            if (categoria === 'Accesorios' || producto.talles.includes(talle)) {
                carritoFinal({ ...producto, talle });
            } else {
                alert("¡Talle no disponible!");
            }
        } else {
            alert("¡El producto que buscas no lo tenemos en stock!");
        }
        
        seguirComprando = confirm(`${nombreUsuario}, ¿te gustaría seguir comprando?`);
        if (seguirComprando) {
            const nuevaCategoria = elegirCategoria();
            listaMayorMenor(nuevaCategoria);
        }
    } while (seguirComprando);
    
    mostrarCarrito();
};

const carritoFinal = (producto) => {
    const productoEnCarrito = carritoDeCompras.find(item => item.nombre === producto.nombre && item.talle === producto.talle);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carritoDeCompras.push(producto);
    }
    console.log("Producto agregado al carrito: " + producto.nombre + (producto.talle ? " (Talle: " + producto.talle + ")" : ""));
};

const mostrarCarrito = () => {
    if (carritoDeCompras.length > 0) {
        let total = 0;
        const productosCarrito = carritoDeCompras.map(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            return producto.nombre + (producto.talle ? " (Talle: " + producto.talle + ")" : "") + " (x" + producto.cantidad + ") - $" + subtotal;
        });
        
        alert("Carrito de Compras:\n\n" + productosCarrito.join("\n") + "\n\nTotal: $" + total);

        const codigoDescuento = prompt("¡Si escribes, quieroel10%off, tenes un descuento!");
        if (codigoDescuento === "quieroel10%off") {
            total *= 0.9; // Aplicar descuento del 10%
            alert("¡Descuento aplicado! El nuevo total es: $" + total.toFixed(2));
        }
    } else {
        alert("Tu carrito está vacío.");
    }
    alert(`Gracias por tu compra, ${nombreUsuario}. ¡Que tengas un excelente día!`);
};

const categoria = elegirCategoria();
listaMayorMenor(categoria);
