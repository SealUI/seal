const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const uppercamelcase = require('uppercamelcase')

const createFile = async (pageName, moduleName, vuex, position, ModulePath, moduleConfig) => {
  if (!moduleName) return
  const ModuleName = uppercamelcase(moduleName)
  const moduleFiles = [
    {
      filename: `${moduleName}.vue`,
      content: `<template>
  <div v-show="${moduleName}ShowState" class="chn-${moduleName}">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixins from './mixins'

export default {
  name: 'Chn${ModuleName}',
  mixins: [mixins],
  data() {
    return {
      // code
    }
  },
  computed: {
    ...mapGetters({
      ${moduleName}ShowState: 'get${ModuleName}ShowState',
    })
  },
  watch: {
    '${moduleName}ShowState': 'on${ModuleName}ShowState',
  },
  mounted() {
    // code
  },
  methods: {
    on${ModuleName}ShowState() {
      // code
    }
  }
}
</script>

<style lang="less" scoped src="./styles/${moduleName}.less"></style>
`
    },
    {
      filename: `styles/${moduleName}.less`,
      content: `.chn-${moduleName}{

}
`
    },
    {
      filename: 'mixins/index.js',
      content: `export default {
  methods: {
    // code
  }
}
`
    }
  ]

  const vuexFiles = [
    {
      filename: 'vuex/index.js',
      content: `import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  ${moduleName}ShowState: false
}

export default {
  state,
  actions,
  getters,
  mutations
}
`
    },
    {
      filename: 'vuex/getters.js',
      content: `export const get${ModuleName}ShowState = state => state.${moduleName}ShowState`
    },
    {
      filename: 'vuex/actions.js',
      content: `import * as types from './mutation-type'

export const change${ModuleName}ShowState = ({ rootState, state, dispatch, commit }, payload) => {
  commit(types.CHANGE_${moduleName.toUpperCase()}_SHOW_STATUS, payload)
}
`
    },
    {
      filename: 'vuex/mutation-type.js',
      content: `export const CHANGE_${moduleName.toUpperCase()}_SHOW_STATUS = 'CHANGE_${moduleName.toUpperCase()}_SHOW_STATUS'
`
    },
    {
      filename: 'vuex/mutations.js',
      content: `import * as types from './mutation-type'

export default {
  [types.CHANGE_${moduleName.toUpperCase()}_SHOW_STATUS](state, payload) {
    state.${moduleName}ShowState = payload
  }
}
`
    }
  ]

  // 创建 modules
  moduleFiles.forEach(file => {
    try {
      fs.outputFileSync(path.join(ModulePath, file.filename), file.content)
    } catch (err) {
      console.error(err)
    }
  })
  if (vuex) {
    vuexFiles.forEach(file => {
      try {
        fs.outputFileSync(path.join(ModulePath, file.filename), file.content)
      } catch (err) {
        console.error(err)
      }
    })
  }
  const modulesFile = require(moduleConfig)
  modulesFile[pageName].push({
    name: `${moduleName}`,
    mainVue: `${moduleName}.vue`,
    vuex: `${moduleName}`,
    layoutType: `${position}`,
    mock: vuex
  })
  try {
    await fs.writeFile(moduleConfig, JSON.stringify(modulesFile, null, 2) + os.EOL)
    return moduleName
  } catch (err) {
    console.error(err)
  }
}

module.exports = createFile
