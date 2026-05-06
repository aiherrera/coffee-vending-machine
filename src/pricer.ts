// Base types given
export type Category = "size" | "creamer";
export type Option = "small" | "medium" | "large" | "none" | "dairy" | "non-dairy";
export type Price = number;
export interface Pricer {
  /**
   * Invoked each time the user makes a selection.
   * No need to validate arguments, the caller validates the arguments before this function is invoked.
   * @returns the _total_ price of the coffee so far given all the selections made
   */
  (category: Category, option: Option): Price;
}
// Additional types
type SelectionState = Readonly<{
  size: Option;
  creamer: Option;
}>;

const INITIAL_SELECTION_STATE: SelectionState = {
  size: "small",
  creamer: "none",
} as const;

/**
 * we could have splitted size and creamer into two different types as an alternative option, but
 * since this is a simple coffee vending machine, for this specific use case, it is simpler to maintain
 * one entity holding all values, since it won't scale that much adding user options
 * */
const PRICE_BY_CATEGORY_AND_OPTION = {
  size: {
    small: 1.0,
    medium: 1.5,
    large: 2.0,
  },
  creamer: {
    none: 0.0,
    dairy: 0.25,
    "non-dairy": 0.5,
  },
} as const satisfies Record<Category, Partial<Record<Option, Price>>>;

// Utility function to get the price from state
const getPrice = (state: SelectionState): Price =>
  PRICE_BY_CATEGORY_AND_OPTION.size[
    state.size as keyof typeof PRICE_BY_CATEGORY_AND_OPTION.size
  ] +
  PRICE_BY_CATEGORY_AND_OPTION.creamer[
    state.creamer as keyof typeof PRICE_BY_CATEGORY_AND_OPTION.creamer
  ];
/**
 * A new pricer is created for each coffee being purchased.
 */
export const createPricer = (): Pricer => {
  let state = INITIAL_SELECTION_STATE;

  return (category, option) => {
    state = {
      ...state,
      [category]: option,
    };

    return getPrice(state);
  };
};
