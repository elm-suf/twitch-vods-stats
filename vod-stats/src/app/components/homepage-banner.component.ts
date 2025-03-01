import { Component, EventEmitter, OnInit, Output, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home-banner",
  imports: [FormsModule],
  template: `
    <form
      (ngSubmit)="search(searchInput.value)"
      class="px-40 flex flex-1 justify-center py-5"
    >
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="@container">
          <div class="@[480px]:p-4">
            <div
              class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
              style='background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/121b65a9-80df-4cd9-ac0d-322ef17fe4cb.png");'
            >
              <h1
                class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center"
              >
                Discover the best live streams and past broadcasts
              </h1>
              <label
                class="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16"
              >
                <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    class="text-[#999999] flex border border-[#3D3D3D] bg-[#242424] items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="20px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    #searchInput
                    placeholder="Search for a streamer"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#FFFFFF] focus:outline-0 focus:ring-0 border border-[#3D3D3D] bg-[#242424] focus:border-[#3D3D3D] h-full placeholder:text-[#999999] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                    value=""
                  />
                  <div
                    class="flex items-center justify-center rounded-r-xl border-l-0 border border-[#3D3D3D] bg-[#242424] pr-[7px]"
                  >
                    <button
                      type="submit"
                      class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#019863] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span class="truncate">Search</span>
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
})
export class HomepageBannerComponent {
  @Output() onSearch = new EventEmitter<string>();
  search(value: string) {
    console.debug("submitting search with value:", value);
    this.onSearch.emit(value);
  }
}
