<template>
  <div class="container">
    <h1>Categorias</h1>

    <b-alert
      :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{mensaje.texto}}
    </b-alert>

    <form v-if="!editar" @submit.prevent="crearCategoria()">
      <h3>Agregar nueva categoría</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="categoriaTemp.nombre">
      <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="categoriaTemp.descripcion">
      <b-button class="btn-success my-2" type="submit" >Agregar</b-button>
    </form>

    <form v-if="editar" @submit.prevent="editarCategoriaPut(categoriaTempEdit)">
      <h3>Editar categoría</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="categoriaTempEdit.nombre">
      <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="categoriaTempEdit.descripcion">
      <b-button class="btn-warning my-2 " type="submit" @click="editarCategoriaPut">Editar</b-button>
      <b-button class="mx-2 my-2 " type="submit" @click="(editar = false)">Cancelar</b-button>
    </form>

    <table class="table" v-if="(categorias.length > 0)">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Instructor</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categorias" :key="index">
          <th style="color:black;">{{ index+1 }}</th>
          <td style="color:black;">{{ item.nombre }}</td>
          <td style="color:black;">{{ item.usuario.nombre }}</td>
          <td style="color:black;">
            <b-button @click="alerta()">Ver</b-button>
            <b-button class="btn-danger mx-2 " type="submit" @click="eliminarCategoria(item.id)">Eliminar</b-button>
            <b-button class="btn-warning mx-2 " type="submit" @click="editarCategoria(item._id)">Editar</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>No hay Datos</h3>
    </div>
    <nav>
      <div style="display:flex;justify-content: center;">
        <ul class="pagination">
          <li class="page-item" v-if="!isDisabledAnt">
            <router-link :to="{query: {pagina: paginaActual -1 }}">
              <b-button class="mx-2">Ant</b-button>
            </router-link>
          </li>
          <li class="page-item" v-for="(item,index) in cantidadPaginas" :key="index">
            <router-link :to="{query: {pagina: index +1 }}">
              <b-button class="btn-success mx-1">{{index+1}}</b-button>
            </router-link>
          </li>
          <li class="page-item" v-if="!isDisabledSgt">
            <router-link :to="{query: {pagina: paginaActual +1 }}">
              <b-button class="mx-2">Sgt</b-button>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
  export default {
    name: 'Categorias',
    data() {
      return {
        categorias: [],
        mensaje: {
          color: '',
          texto: ''
        },
        dismissSecs: 5,
        dismissCountDown: 0,
        categoriaTemp: {
          nombre: '',
          descripcion: ''
        },
        categoriaTempEdit: {},
        editar: false,
        usuario: {},
        totalCategorias: 0,
        limite: 5,
        paginaActual: 1,
      }
    },
    computed: {
      isDisabledAnt(){
        if (this.paginaActual == 1) {
          console.log('trueee');
          return true
        }else {
          return false
        }
      },
      isDisabledSgt() {
        if (this.paginaActual == this.cantidadPaginas) {
          console.log('trueee2');
          return true
        } else {
          return false
        }
      },
      ...mapState(['token']),
      cantidadPaginas() {
        return Math.ceil(this.totalCategorias / this.limite)
      }
    },
    watch: {
      "$route.query.pagina": {
        immediate: true,
        handler(pagina) {
          pagina = parseInt(pagina) || 1;
          this.paginacion(pagina);
          this.paginaActual = pagina;
        }
      }
    },
    methods: {
      ...mapMutations(['getUser']),
      paginacion(pagina) {
        let config = {
          headers: {
            'x-token': this.token
          }
        }
        let skip = (pagina -1) * this.limite;

        this.axios.get(`/categorias?limite=${this.limite}&desde=${skip}`)
          .then(res=> {
            console.log(res.data,'res data xdd');
            this.categorias = res.data.categorias
            this.totalCategorias = res.data.total;
          })
          .catch(e=> {
            console.log(e.response);
          })
      },
      alerta() {
        this.mensaje.color = 'success'
        this.mensaje.texto = 'Probando alerta'
        this.showAlert();
      },
      listarCategorias() {
        this.axios.get('/categorias')
          .then( res => {
            console.log(res,'res');
            this.categorias = res.data.categorias;
            this.categorias.forEach(element => {
              element.id = element._id;
            })
            console.log(this.categorias, 'this.categorias');
            this.showAlert()
          })
          .catch( e => {
            console.log(e.response);
          })
      },
      crearCategoria() {


        this.token = this.$store.state.token;

        let config = {
          headers: {
            'x-token': this.token
          }
        }
        this.axios.post('/categorias', this.categoriaTemp,config)
          .then( res => {
            //this.categorias.push(res.data);
            this.listarCategorias();
            this.categoriaTemp.nombre = '';
            this.categoriaTemp.descripcion = '';
            this.mensaje.color = 'success'
            this.mensaje.texto = 'Categoría agregada correctamente!'
            console.log(res,'respuesta al agregar categoria');
          })
          .catch( e=> {
            console.log(e.response)
            this.mensaje.color = 'danger'
            this.mensaje.texto = 'Oh no! algo ha salido mal y la categoría no fue registrada.'
            this.showAlert();
          })
      },
      eliminarCategoria( id= '' ) {
        console.log(id,'id');
        this.axios.delete(`/categorias/${id}`)
          .then(res => {

            const index = this.categorias.findIndex( item => item.id == res.data._id);
            this.categorias.splice(index, 1);

            this.categoriaTemp = {};
            this.mensaje.color = 'danger'
            this.mensaje.texto = 'Categoría eliminada correctamente!'
            console.log(res, 'respuesta al agregar categoria');
          })
          .catch(e => {
            console.log(e.response)
            this.mensaje.color = 'danger'
            this.mensaje.texto = 'Oh no! algo ha salido mal y la categoría no fue eliminada.'
            this.showAlert();
          })
      },
      editarCategoria( id= '' ) {
        this.editar = true;
        console.log(id,'id a editar');
        this.axios.get(`/categorias/${id}`)
          .then(res => {

            this.categoriaTempEdit = res.data;

          })
          .catch(e => {
            console.log(e.response)
            this.mensaje.color = 'danger'
            this.mensaje.texto = 'Oh no! algo ha salido mal y la categoría no fue editada.'
            this.showAlert();
          })
      },
      editarCategoriaPut( categoria = {} ) {
        this.axios.put(`/categorias/${categoria._id}`, categoria)
          .then( res => {
            const index = this.categorias.findIndex( element => element._id === res.data._id );
            this.categorias[index].nombre = res.data.nombre;
            this.categorias[index].descripcion = res.data.descripcion;

            this.mensaje.color = 'danger'
            this.mensaje.texto = 'Categoría editada correctamente!'
            this.showAlert();
            this.editar = false;

          })
          .catch( e=> {
            console.log(e.response);
          })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>