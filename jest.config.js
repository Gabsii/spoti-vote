module.exports = {
    watchPathIgnorePatterns: [
        '<rootDir>/node_modules'
    ],
    watchPlugins: [
        'jest-runner-eslint/watch-fix',
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],
    projects: [
        {
            displayName: 'other-lint',
            runner: 'jest-runner-eslint',
            testMatch: [
                '<rootDir>/*.js'
            ]
        },
        {
            displayName: 'backend-lint',
            runner: 'jest-runner-eslint',
            testMatch: [
                '<rootDir>/backend/**/*.js'
            ]
        },
        {
            displayName: 'backend',
            roots: [
                '<rootDir>/backend/'
            ],
            testMatch: [
                '<rootDir>/backend/**/__tests__/**/*test.js'
            ]
        },
        {
            displayName: 'frontend-lint',
            runner: 'jest-runner-eslint',
            testMatch: [
                '<rootDir>/frontend/src/**/*.{js,jsx}'
            ]
        },
        {
            displayName: 'frontend testing',
            roots: [
                '<rootDir>/frontend/src'
            ],
            collectCoverageFrom: [
                'frontend/src/**/*.{js,jsx,ts,tsx}',
                '!frontend/src/**/*.d.ts'
            ],
            setupFiles: [
                'react-app-polyfill/jsdom'
            ],
            setupFilesAfterEnv: [],
            testMatch: [
                '<rootDir>/frontend/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
                '<rootDir>/frontend/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
            ],
            testEnvironment: 'jest-environment-jsdom-fourteen',
            transform: {
                '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
                '^.+\\.css$': '<rootDir>/frontend/config/jest/cssTransform.js',
                '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/frontend/config/jest/fileTransform.js'
            },
            transformIgnorePatterns: [
                '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
                '^.+\\.module\\.(css|sass|scss)$'
            ],
            modulePaths: [],
            moduleNameMapper: {
                '^react-native$': 'react-native-web',
                '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
            },
            moduleFileExtensions: [
                'web.js',
                'js',
                'web.ts',
                'ts',
                'web.tsx',
                'tsx',
                'json',
                'web.jsx',
                'jsx',
                'node'
            ]
        }
    ]
};