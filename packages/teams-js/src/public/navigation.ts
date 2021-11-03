import { ensureInitialized } from '../internal/internalAPIs';
import { FrameContexts } from './constants';
import { TabInstance } from './interfaces';
import { pages } from './pages';
/**
 * Navigation specific part of the SDK.
 */

/**
 * @deprecated with Teams JS v2 upgrades
 *
 * Return focus to the main Teams app. Will focus search bar if navigating foward and app bar if navigating back.
 *
 * @param navigateForward - Determines the direction to focus in teams app.
 */
export function returnFocus(navigateForward?: boolean): void {
  pages.returnFocus(navigateForward);
}

/**
 * @deprecated with Teams JS v2 upgrades
 *
 * Navigates the Microsoft Teams app to the specified tab instance.
 *
 * @param tabInstance - The tab instance to navigate to.
 * @param onComplete - The callback to invoke when the action is complete.
 */
export function navigateToTab(tabInstance: TabInstance, onComplete?: (status: boolean, reason?: string) => void): void {
  ensureInitialized();
  pages.tabs
    .navigateToTab(tabInstance)
    .then(() => {
      if (onComplete) {
        onComplete(true);
      }
    })
    .catch((error: Error) => {
      if (onComplete) {
        onComplete(false, error.message);
      }
    });
}

/**
 * @deprecated with Teams JS v2 upgrades
 *
 * Navigates the frame to a new cross-domain URL. The domain of this URL must match at least one of the
 * valid domains specified in the validDomains block of the manifest; otherwise, an exception will be
 * thrown. This function needs to be used only when navigating the frame to a URL in a different domain
 * than the current one in a way that keeps the app informed of the change and allows the SDK to
 * continue working.
 *
 * @param url - The URL to navigate the frame to.
 * @param onComplete - The callback to invoke when the action is complete.
 */
export function navigateCrossDomain(url: string, onComplete?: (status: boolean, reason?: string) => void): void {
  ensureInitialized(
    FrameContexts.content,
    FrameContexts.sidePanel,
    FrameContexts.settings,
    FrameContexts.remove,
    FrameContexts.task,
    FrameContexts.stage,
    FrameContexts.meetingStage,
  );
  pages
    .navigateCrossDomain(url)
    .then(() => {
      if (onComplete) {
        onComplete(true);
      }
    })
    .catch((error: Error) => {
      if (onComplete) {
        onComplete(false, error.message);
      }
    });
}

/**
 * @deprecated with Teams JS v2 upgrades
 *
 * Navigates back in the Teams client.
 * See registerBackButtonHandler for more information on when it's appropriate to use this method.
 *
 * @param onComplete - The callback to invoke when the action is complete.
 */
export function navigateBack(onComplete?: (status: boolean, reason?: string) => void): void {
  ensureInitialized();
  pages.backStack
    .navigateBack()
    .then(() => {
      if (onComplete) {
        onComplete(true);
      }
    })
    .catch((error: Error) => {
      if (onComplete) {
        onComplete(false, error.message);
      }
    });
}
