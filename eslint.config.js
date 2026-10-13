import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
export default ts.config({ignores:['dist','.deploy-demo','.vercel','node_modules','.npm-cache','test-results','playwright-report']},js.configs.recommended,...ts.configs.recommended,{languageOptions:{globals:{...globals.browser,...globals.node}}});
