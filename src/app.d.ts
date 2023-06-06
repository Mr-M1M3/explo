// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type Pocketbase from "pocketbase";
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
