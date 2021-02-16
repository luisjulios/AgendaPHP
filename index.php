<?php	include 'inc/layout/header.php'?>
  <div class="contenedor-barra">
    <h1>Agenda de Contacto</h1>
  </div>

  <div class="bg-secundario contenedor sombra">
    <form action="#" id="contacto">
    <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>

    <?php	include 'inc/layout/formulario.php'?>


    </form>
  </div>
  <div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
      <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contactos...">
        <p class="total-contactos"><span>2</span> Contactos</p>
        <div class="contenedor-tabla">
          <table id="listado-contactos" class="listado-contactos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
              <tbody>
                <tr>
                  <td>Luis</td>
                  <td>Umbrella</td>
                  <td>996536109</td>
                  <td>
                    <a class="btn-editar btn" href="editar.php?id=1">
                      <i class="far fa-edit"></i>
                    </a>
                    <button data-id="1" type="button" class="btn-borrar btn">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Luis</td>
                  <td>Umbrella</td>
                  <td>996536109</td>
                  <td>
                    <a class="btn-editar btn" href="editar.php?id=1">
                      <i class="far fa-edit"></i>
                    </a>
                    <button data-id="1" type="button" class="btn-borrar btn">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Luis</td>
                  <td>Umbrella</td>
                  <td>996536109</td>
                  <td>
                    <a class="btn-editar btn" href="editar.php?id=1">
                      <i class="far fa-edit"></i>
                    </a>
                    <button data-id="1" type="button" class="btn-borrar btn">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </thead>
          </table>
        </div>
    </div>
  </div>

<?php	include 'inc/layout/footer.php'?>