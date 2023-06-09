import { toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';


export function initToast(message:string){
    const t: ToastSettings = {
        message: message,
    };
    toastStore.trigger(t);
}