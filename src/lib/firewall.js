function createFirewall (Plugin) {
  return {

    enabled: false,

    /* Define public routes to firewall ignore */
    publicRoutes: [],

    /**
     * Access Control by URL pattern
     * Sample:
     *   path: '^/events', roles: ['ROLE_USER', 'ROLE_INVITED_USERS']
     *   path: '^/clients', roles: ['ROLE_USER']
     *   path: '^/clients/new', roles: ['ROLE_USER']
     *   path: '^/clients/update', roles: ['ROLE_MANAGER']
     *   path: '^/clients/delete', roles: ['ROLE_MANAGER']
     *   path: '^/clients/deleteAll', roles: ['ROLE_ADMIN']
     */
    urlAccessControl: [],

    /**
     * Provide advanced access control in application
     * vendas.caixa.abrir
     * vendas.caixa.fechar
     * ... TODO: Isso deve ficar aqui ? Não seria somente no store do usuário logado? E na aplicação verificar algo como firewall().hasAcl('vendas.caixa.fechar') ?
     */
    applicationAccessControl: [],

    /**
     * Provide role system to package a permission group
     * Ex.: ROOT, ADMIN, USER, SIMPLE_USER ...
     */
    roles: [],

    /**
     * Provide role hierarchy
     * Ex.:
     *  SUPERUSER: [ROOT, ADMIN, USER, SIMPLE_USER]
     *  BOSS: [ADMIN, USER, SIMPLE_USER]
     */
    roleHierarchy: {},

    /**
     * Add an o more roles
     * @param role String|Array
     * @return this
     */
    addRole (role) {
      return this
    },

    /**
     * Enable firewall
     * @return this
     */
    enable () {
      this.enabled = true
      return this
    },

    /**
     * Disable firewall
     * @return this
     */
    disable () {
      this.enabled = false
      return this
    }

  }
}

export default {
  install ({Plugin, Vue}) {
    this.instance = Plugin.firewall = createFirewall(Plugin)
  }
}
