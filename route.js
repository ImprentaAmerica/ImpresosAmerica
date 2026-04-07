<script>
    function mostrarSeccion(seccion) {
        document.querySelectorAll('.seccion-funcional').forEach(el => {
            el.classList.remove('activo');
        });
        if (seccion === 'presupuesto') {
            document.getElementById('seccion-presupuesto').classList.add('activo');
        } else if (seccion === 'pedido') {
            document.getElementById('seccion-pedido').classList.add('activo');
        }
        document.getElementById('pedidos').scrollIntoView({ behavior: 'smooth' });
    }

    function cerrarSecciones() {
        document.querySelectorAll('.seccion-funcional').forEach(el => {
            el.classList.remove('activo');
        });
    }

    function calcular() {
        const precio = parseFloat(document.getElementById('servicioSelect').value);
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
        const resultado = document.getElementById('resultadoPresupuesto');
        if (precio > 0) {
            const total = precio * cantidad;
            resultado.innerHTML = `Presupuesto estimado: <strong>$${total.toLocaleString('es-MX')} MXN</strong>`;
            resultado.style.color = '#28a745';
            resultado.style.fontSize = '1.4em';
        } else {
            resultado.innerHTML = `Selecciona un servicio para calcular.`;
            resultado.style.color = '#666';
        }
    }

    const SUPABASE_URL = 'https://sggppmordbmhyixjvzul.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_1ngye4eaAyeYlmJC-Qw1sg_RmbjgAg0';
    
    async function enviarPedido() {
      const pedido = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value || null,
        servicio: document.getElementById('servicio').value,
        descripcion: document.getElementById('descripcion').value,
        cantidad: parseInt(document.getElementById('cantidad').value) || 1
      }

      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/pedidos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify([pedido])
        })

        if (response.ok) {
          alert('✅ ¡Pedido guardado en Supabase!');
          document.getElementById('formPedido').reset();
          cerrarSecciones();
        } else {
          alert('❌ Error al guardar');
        }
      } catch (error) {
        alert('❌ Error: ' + error.message);
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('formPedido')?.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarPedido();
      });
    });
</script>
