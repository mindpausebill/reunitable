import { useCallback } from 'react';

import { useAppLocationState } from './useAppLocationState';
import { AppLocation } from './AppLocationContext';

type NullableLocation = AppLocation | null;
type LocationMatcher = (path: string) => NullableLocation;

/**
 * Hook returning a function that checks if the path argument matches the current location in the context
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * @example
 *
 *  import { AppLocationContext, useAppLocationMatcher } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout } from 'react-admin';
 *
 *  const MatchAdvertiser = () => {
 *    const match = useAppLocationMatcher();
 *
 *    return (
 *      <>
 *        {match('posts') && <h1>You're on the Posts...</h1>}
 *        {match('posts.list) && <h2>Moreover it's the Posts List!</h2>}
 *      </>
 *    );
 *  };
 *
 *  const MyLayout = ({ children, ...props }) =>  (
 *    <AppLocationContext>
 *      <Layout {...props}>
 *        <MatchAdvertiser />
 *        {children}
 *      </Layout>
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *      />
 *    </Admin>
 *  );
 *
 * The page title will only show "You're on the Posts..." on Post Edit page.
 * It'll show both "You're on the Posts..." and "Moreover it's the Posts List!" on Post List page.
 */
export const useAppLocationMatcher = (): LocationMatcher => {
    const [location] = useAppLocationState();
    return useCallback(
        (path: string): NullableLocation => {
            // Should always match the empty path which is the dashboard
            if (path === '') {
                return location;
            }
            const pathToMatchParts = (location.path || '').split('.');
            const pathParts = path.split('.');

            const isMatch = pathParts.reduce((isMatch, part, index) => {
                if (pathToMatchParts.length - 1 < index) {
                    return false;
                }

                return isMatch && part === pathToMatchParts[index];
            }, true);

            return isMatch ? location : null;
        },
        [location]
    );
};
