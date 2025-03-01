import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [FormsModule, RouterLink],
  template: ` <header
    class="flex flex-row items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2E2E2E] px-4 md:px-10 py-3 gap-4"
  >
    <div class="flex items-center gap-4 text-[#FFFFFF] cursor-pointer group" [routerLink]="['/']" >
      <div class="size-4 group-hover:text-[#CCCCCC]">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <h2
        class="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] group-hover:text-[#CCCCCC] hidden sm:block"
      >
        Streamr
      </h2>
    </div>
    <form
      (ngSubmit)="search(searchInput.value)"
      class="flex flex-1 justify-end gap-4 md:gap-8"
    >
      <label class="flex flex-col min-w-40 !h-10 max-w-full md:max-w-64 group w-full md:w-auto">
        <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
          <div
            class="text-[#999999] flex border-none bg-[#2E2E2E] items-center justify-center pl-4 rounded-l-xl border-r-0 group-hover:text-[#CCCCCC]"
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
            #searchInput
            placeholder="Search"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#FFFFFF] focus:outline-0 focus:ring-0 border-none bg-[#2E2E2E] focus:border-none h-full placeholder:text-[#999999] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal group-hover:text-[#CCCCCC]"
            value=""
          />
        </div>
      </label>
    </form>
  </header>`,
})
export class HeaderComponent {
  @Output() onSearch = new EventEmitter<string>();
  search(value: string) {
    console.debug("submitting search with value:", value);

    this.onSearch.emit(value);
  }
}
