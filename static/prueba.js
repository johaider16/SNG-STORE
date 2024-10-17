document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.querySelector('#cart-items tbody');
    const cartTotal = document.getElementById('cart-total');
    const confirmationMessage = document.getElementById('confirmation-message');
    const checkoutButton = document.getElementById('checkout');
    let cart = [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.price * item.quantity}</td>
                <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
            `;
            cartItems.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total}`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {

            alert("Se agregó al carrito.!!")

            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartItems.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    checkoutButton.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Mostrar mensaje de confirmación
        confirmationMessage.textContent = '¡Compra finalizada con éxito! Gracias por su compra.';
        
        // Generar el PDF
        generatePDF();

        // Vaciar el carrito
        cart = [];
        updateCart();
    });

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Resumen de tu compra', 10, 10);

        let yOffset = 30;
        cart.forEach(item => {
            doc.text(`Producto: ${item.name}`, 10, yOffset);
            doc.text(`Cantidad: ${item.quantity}`, 100, yOffset);
            doc.text(`Precio: $${item.price}`, 150, yOffset);
            yOffset += 10;
        });

        // Agregar total
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        doc.text(`Total: $${total}`, 10, yOffset + 10);

        // Descargar el PDF
        doc.save('resumen-compra.pdf');
    }
});
