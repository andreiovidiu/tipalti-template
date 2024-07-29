import { makeAutoObservable } from "mobx";
import { ExpensesInfo } from "./ExpensesInfo";

export class ExpensesState {
  isLoading = true;
  tableData: ExpensesInfo[] = [];

  constructor() {
    // Probably only needed isLoading as an observable, but
    // attributes are disabled in this boilerplate
    makeAutoObservable(this);

    this.fetch_data()
      .catch((e: Error) => {
        console.log(
          `Failed to fetch data from the API\n\nReason: ${e.message}`
        );
        this.default_fallback();
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async fetch_data() {
    const response = await fetch(
      "https://expenses-backend-mu.vercel.app/expenses",
      {
        headers: {
          "Content-Type": "application/json",
          Username: "ovidiu.badea",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `API request failed with status ${response.status}; reason: ${response.statusText}`
      );
    }

    this.tableData = (await response.json()).map((transaction: any) => {
      return { ...transaction, date: new Date(transaction.date) };
    });
  }

  default_fallback() {
    this.tableData = [
      {
        id: 1,
        merchant: "AWS",
        amount: 1260,
        description: "Hosting for hobby project",
        date: new Date("2022-05-24T12:00:00.000Z"),
        category: "training",
        status: "draft",
      },
      {
        id: 2,
        merchant: "Waterstones",
        amount: 999,
        description: "Programming book",
        date: new Date("2022-05-22T12:00:00.000Z"),
        category: "training",
        status: "draft",
      },
      {
        id: 3,
        merchant: "BA",
        amount: 434.22,
        description: "Flight",
        date: new Date("2022-05-04T12:00:00.000Z"),
        category: "travel",
        status: "draft",
      },
      {
        id: 4,
        merchant: "Wasabi",
        amount: 7.25,
        description: "Meal for at engineering conference",
        date: new Date("2022-05-04T12:00:00.000Z"),
        category: "meals",
        status: "draft",
      },
    ];
  }
}
