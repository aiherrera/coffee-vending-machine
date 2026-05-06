## The exercise

We’re building an automated coffee vending machine. This machine might be found at a train station or a large office building. The user interface for this coffee vending machine presents the user with options. The user can change their options many times before they choose the purchase. Your job is to write a function that provides an updated price each time an option is selected.

This function is deep inside the coffee vending machine, this function is not exposed as an HTTP API. All other parts of the coffee vending machine have already been built. The interface for this function has already been defined. You cannot change the signature of the function even though there may be a better way to design the function.

The following variables affect the price of the coffee: size and creamer. The prices are:

Size

- Small: $1.00
- Medium: $1.50
- Large: $2.00

Creamer

- None: $0.00
- Dairy: $0.25
- Non-Dairy: $0.50


## Implementation notes

1. The solution keeps the public types and the `createPricer` signature exactly as provided.
2. Runtime validation is intentionally omitted because the prompt states that the caller validates arguments before invoking the pricer.
3. The implementation uses small immutable internal types to model the selected options without changing the provided public interface.
4. Price lookup is handled through readonly records making missing or changed prices easier to detect during development.
5. `createPricer` uses a closure to keep private state for a single coffee order. Each call updates the selected option for one category and returns the latest total price.
6. State updates replace the previous state object instead of mutating it in place.