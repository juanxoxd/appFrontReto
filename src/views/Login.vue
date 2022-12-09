<template>
  <div>
    <div>
      <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
          <div class="col-12">
            <!-- Navbar -->
            <nav
              class="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
              <div class="container-fluid">
                <a class="navbar-brand font-weight-bolder ms-lg-0 ms-3 ">
                  Node App Reto
                </a>
                <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div class="collapse navbar-collapse" id="navigation">
                  <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                      <router-link to="/login">Iniciar Sesión</router-link>
                    </li>
                  </ul>
                  <ul class="navbar-nav d-lg-block d-none">
                    <li class="nav-item">
                      <a href="https://api.whatsapp.com/send?phone=51956144377&text=Hola"
                        class="btn btn-sm mb-0 me-1 btn-primary" target="_blank">Hola!</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <!-- End Navbar -->
          </div>
        </div>
      </div>
      <main class="main-content  mt-0">
        <section>
          <div class="page-header min-vh-100">
            <div class="container">
              <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div class="card card-plain">
                    <div class="card-header pb-0 text-start">
                      <h4 class="font-weight-bolder">Sign In</h4>
                      <p class="mb-0">Ingrese sus credenciales para iniciar sesión!</p>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <div class="mb-3">
                          <input v-model="usuario.correo" type="email" class="form-control form-control-lg" placeholder="Email" aria-label="Email">
                        </div>
                        <div class="mb-3">
                          <input v-model="usuario.password" type="password" class="form-control form-control-lg" placeholder="Password"
                            aria-label="Password">
                        </div>
                        <div class="text-center">
                          <button @click="login()" type="button" class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Iniciar Sesión</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                  <div
                    class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                    style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                        background-size: cover;">
                    <span class="mask bg-gradient-primary opacity-6"></span>
                    <h4 class="mt-5 text-white font-weight-bolder position-relative">"Platdumi"</h4>
                    <p class="text-white position-relative">En proceso de creación.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <input type="email" class="form-control my-2" placeholder="Correo" v-model="usuario.correo">
      <input type="text" class="form-control my-2" placeholder="Password" v-model="usuario.password">
      <b-button class="btn-success" type="submit">Acceder</b-button>
    </form>
    <div v-if="mensaje != ''">
      <p>{{mensaje}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      usuario: {
        correo: '',
        password: ''
      },
      mensaje: ''
    }
  },
  methods: {
    ...mapMutations(['getUser']),
    ...mapActions(['saveUser']),
    login() {
      console.log(this.usuario,'usuario');
      this.axios.post('/auth/login', this.usuario)
        .then( res => {
          console.log(res.data,'data');
          const token = res.data.token;
          this.saveUser(token);
          this.$router.push({name: 'categorias'});
        })
        .catch( e => {
          console.log(e.response,'error');
          this.mensaje = e.response.data.msg
        })
    }
  },
  computed: {
    ...mapGetters(['isActive'])
  }
}
</script>