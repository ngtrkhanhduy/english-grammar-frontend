import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { HeaderOnlyLayout } from './components/Layout';

function App() {
    const MenuItem_Learning = [
        {
            title: 'Learning 1',
            to: '/',
        },
        {
            title: 'Learning 2',
            to: '/',
        },
    ];

    const MenuItem_document = [
        {
            title: 'Document 1',
            to: '/',
        },
        {
            title: 'Document 2',
            to: '/',
        },
    ];

    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.default.map((route, index) => {
                        const Page = route.component;
                        let Layout = HeaderOnlyLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.learning.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout MenuItemList={MenuItem_Learning}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.document.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout MenuItemList={MenuItem_document}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
