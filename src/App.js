import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { HeaderOnlyLayout } from './components/Layout';
import Cookies from 'js-cookie';

function App() {
    const username = Cookies.get('username');

    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.default.map((route, index) => {
                        const Page = route.component;
                        const Layout = HeaderOnlyLayout;

                        // If the user is not logged in, redirect to /login
                        if (!username) {
                            return <Route key={index} path={route.path} element={<Navigate to="/login" replace />} />;
                        }

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
                        const Layout = DefaultLayout;

                        if (!username) {
                            return <Route key={index} path={route.path} element={<Navigate to="/login" replace />} />;
                        }

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

                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        // If path is /Login, render the Page directly (no layout)
                        if (route.path.toLowerCase() === '/login') {
                            return <Route key={index} path={route.path} element={<Page />} />;
                        }

                        // Otherwise, wrap in HeaderOnlyLayout
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <HeaderOnlyLayout>
                                        <Page />
                                    </HeaderOnlyLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
