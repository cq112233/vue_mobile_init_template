// 全局组件魔法注释
const IMPORT_COMMON_COMPONENT = '/** plop import common compontent **/'
const IMPORT_COMMON_COMPONENT_NAME =
  '/** plop import common compontent name **/'

function sortFieldMatch(field) {
  const stringArray = field.split('') // 将字符串分割成相应的字符串数组
  let newField = field
  stringArray.forEach((t, i) => {
    if (/[A-Z]/.test(t)) {
      // 遍历分割之后的字符串组，将找到的大写字母替换成其他字符串，将替换后的字符串赋值给另外一个新的string 变量
      if (i === 0) {
        newField = newField.replace(t, `${t.toLowerCase()}`)
      } else {
        newField = newField.replace(t, `-${t.toLowerCase()}`)
      }
    }
  })
  return newField
}

// 全局页面路由魔法注释
const VIEW_LAYOUT_ROUTER = '/** plop view layout router **/'
const VIEW_PAGE_ROUTER = '/** plop view page router **/'
module.exports = plop => {
  plop.setHelper('snakeCssCase', function(text) {
    return sortFieldMatch(text)
  })
  // 创建组件
  plop.setGenerator('component', {
    // 描述文件
    description: 'create a component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name',
      default: 'myComponent'
    },
    // 选择 是项目组件 or 通用组件 😺
    {
      type: 'list',
      name: 'type',
      message: 'common or project?',
      choices: [{
        name: 'common',
        checked: true
      }, {
        name: 'project',
        checked: false
      }],
      default: 'project'
    }
    ],
    actions(option) {
      let actions = []
      if (option.type === 'project') {
        actions = actions.concat([{
          type: 'add', // 类型添加
          path: 'src/components/project/{{camelCase name}}.vue',
          templateFile: 'plop-templates/component/index.hbs'
        }])
      } else {
        // 全局注册 公共组件
        actions = actions.concat([{
          type: 'add', // 类型添加
          path: 'src/components/common/{{camelCase name}}/index.vue',
          templateFile: 'plop-templates/component/index.hbs'
        },
        {
          type: 'append',
          pattern: IMPORT_COMMON_COMPONENT,
          path: 'src/components/common/index.js',
          template: 'import {{ camelCase name}} from "@/components/common/{{camelCase name}}/index";'
        },
        {
          type: 'append',
          pattern: IMPORT_COMMON_COMPONENT_NAME,
          path: 'src/components/common/index.js',
          template: '{{ camelCase name }},'
        }
        ])
      }
      return actions
    }
  })
  // 创建page
  plop.setGenerator('page', {
    description: 'create a page',
    prompts: [
      // 创建一个页面
      {
        type: 'input',
        name: 'name',
        message: 'set page path name:',
        default: 'defaultPage'
      },
      // {
      //   type: 'input',
      //   name: 'type',
      //   message: 'set file name:',
      //   default: 'views'
      // },
      {
        type: 'input',
        name: 'des',
        message: 'set page title:',
        default: '一个page的页面'
      },
      {
        type: 'checkbox',
        name: 'meta',
        message: 'choices keepAlive,customNav',
        choices: [{
          name: 'keepAlive',
          checked: true
        }, {
          name: 'customNav',
          checked: false
        }
        ]
      }
    ],
    actions(option) {
      option.customNav = option.meta.includes('customNav')
      option.keepAlive = option.meta.includes('keepAlive')
      let actions = []
      actions = actions.concat([{
        type: 'add', // 类型添加
        path: `src/views/{{camelCase name}}/{{camelCase name}}.vue`,
        templateFile: 'plop-templates/view/index.hbs'
      },
      {
        type: 'append',
        pattern: VIEW_PAGE_ROUTER,
        path: 'src/router/pageRoutes.js',
        templateFile: 'plop-templates/view/page-route-register.hbs'
      }
      ])
      return actions
    }
  })
  // 创建layout
  plop.setGenerator('layout', {
    description: 'create a layout',
    prompts: [
      // 创建一个页面
      {
        type: 'input',
        name: 'name',
        message: 'set layout path name:',
        default: 'defaultLayout'
      },
      {
        type: 'input',
        name: 'des',
        message: 'set layout title:',
        default: '一个layout的页面'
      },
      {
        type: 'checkbox',
        name: 'meta',
        message: 'set route meta 😺',
        choices: [{
          name: 'choices keepAlive',
          checked: true
        }]
      }
    ],
    actions(option) {
      option.keepAlive = option.meta.includes('keepAlive')
      let actions = []
      actions = actions.concat([{
        type: 'add', // 类型添加
        path: `src/views/{{camelCase name}}/{{camelCase name}}.vue`,
        templateFile: 'plop-templates/view/index.hbs'
      },
      {
        type: 'append',
        pattern: VIEW_LAYOUT_ROUTER,
        path: 'src/router/tabberRoutes.js',
        templateFile: 'plop-templates/view/layout-route-register.hbs'
      }
      ])
      return actions
    }
  })
}
