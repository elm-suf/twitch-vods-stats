import { Component, Input } from "@angular/core";

import { injectLoad } from "@analogjs/router";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { VodListItemComponent } from "../../../components/vod-list-item.component";
import { load } from "./[userName].server";

@Component({
  selector: "vod-stats-users",
  imports: [CommonModule, VodListItemComponent],
  host: {
    class: "layout-container flex h-full grow flex-col",
  },
  template: `
    <div class="px-40 flex  flex-1 justify-center py-5">
      <div
        class="layout-content-container flex gap-4 flex-col max-w-[960px] flex-1"
      >
        <!-- user details -->
        @if (data().userInfo; as userInfo) {
        <div
          class="flex items-center gap-4 border-b border-solid border-b-[#2E2E2E] p-4 py-8"
        >
          <div
            class="bg-[#2E2E2E] rounded-full w-20 h-20 flex items-center justify-center"
          >
            <img
              class="rounded-full w-20 h-20"
              src="{{ userInfo.profilePictureUrl }}"
              alt="avatar"
            />
          </div>

          <div class="flex flex-col">
            <h1
              class="text-white
                text-[32px] font-bold leading-tight min-w-72"
            >
              {{ userInfo.displayName }}
            </h1>
            <!-- TODO: add an icon that links to the twich channel -->
            <p class="text-[#94b8c7] text-[18px] font-normal leading-tight">
              {{ userInfo.description }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap justify-between gap-3 p-4">
          <p
            class="text-white tracking-light text-[32px] font-bold leading-tight min-w-72"
          >
            Past Broadcasts
          </p>
        </div>

        <!-- search input -->
        <!-- <div class="px-4 py-3">
          <label class="flex flex-col min-w-40 h-12 w-full">
            <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                class="text-[#94b8c7] flex border-none bg-[#253c46] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                  ></path>
                </svg>
              </div>
              <input
                placeholder="Search past broadcasts"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#253c46] focus:border-none h-full placeholder:text-[#94b8c7] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value=""
              />
            </div>
          </label>
        </div> -->

        <!-- vod items -->
        @if (data().paginatedVods.data; as vods) {
        <ul>
          @for (video of vods; track $index) {
          <app-vod-list-item [video]="video"></app-vod-list-item>
          }
        </ul>
        }}
        <!-- pagination -->
        <div class="flex items-center justify-center p-4">
          <a href="#" class="flex size-10 items-center justify-center">
            <div
              class="text-white"
              data-icon="CaretLeft"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"
                ></path>
              </svg>
            </div>
          </a>
          <a
            class="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#253c46]"
            href="#"
            >1</a
          >

          <a href="#" class="flex size-10 items-center justify-center">
            <div
              class="text-white"
              data-icon="CaretRight"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
})
export default class HomeComponent {
  @Input() userName!: string;

  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
