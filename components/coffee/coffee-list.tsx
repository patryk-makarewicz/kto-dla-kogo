export const CoffeeList = () => (
  <div className="w-full max-w-[400px] font-[family-name:var(--font-geist-mono)] text-[#FFFFFF]">
    <div className="bg-primary box-border rounded-2xl border p-4 text-center shadow-lg">
      <h3 className="m-0 font-semibold">Postaw kawę za:</h3>
    </div>
    <div className="mt-3 flex justify-center gap-2 font-bold">
      <a
        href="https://buycoffee.to/tinformacje?coffeeSize=small"
        className="bg-primary flex w-full flex-col items-center justify-center rounded-2xl border p-4 text-center no-underline shadow-lg"
        target="_blank"
        title="Postaw kawę za: 5 zł">
        <img src="https://buycoffee.to/img/coffee-small-dark.svg" alt="small coffee icon" className="h-9 w-9" />
        <span className="mt-2">5 zł</span>
      </a>
      <a
        href="https://buycoffee.to/tinformacje?coffeeSize=medium"
        className="bg-primary flex w-full flex-col items-center justify-center rounded-2xl border p-4 text-center no-underline shadow-lg"
        target="_blank"
        title="Postaw kawę za: 10 zł">
        <img src="https://buycoffee.to/img/coffee-medium-dark.svg" alt="medium coffee icon" className="h-9 w-9" />
        <span className="mt-2">10 zł</span>
      </a>
      <a
        href="https://buycoffee.to/tinformacje?coffeeSize=large"
        className="bg-primary flex w-full flex-col items-center justify-center rounded-2xl border p-4 text-center no-underline shadow-lg"
        target="_blank"
        title="Postaw kawę za: 15 zł">
        <img src="https://buycoffee.to/img/coffee-large-dark.svg" alt="large coffee icon" className="h-9 w-9" />
        <span className="mt-2">15 zł</span>
      </a>
    </div>
  </div>
);
