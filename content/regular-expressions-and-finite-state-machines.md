---
title: Regular Expressions and Finite State Machines
description: Regular expressions are a powerful tool for pattern matching. But how do they work? Let's dive into the world of finite state machines.
date: 2024-07-30
---

Regular expressions are a powerful tool for pattern matching. They are used in a variety of applications such as searching, parsing, and text manipulation. But how do they work? In this article, we will explore the connection between regular expressions and finite state machines.

Stephen Kleene, an American mathematician, introduced regular expressions in the 1950s. He used regular expressions to describe the syntax of [regular languages](https://en.wikipedia.org/wiki/Regular_language). Regular languages are a subset of formal languages that can be recognized by a finite state machine.

## What is a Finite State Machine?

A finite state machine (FSM) is a mathematical model of computation. It consists of a set of states, a set of transitions between states, and an input alphabet. The machine starts in an initial state and processes input symbols one at a time. Based on the current state and the input symbol, the machine transitions to a new state. The machine can be in only one state at a time.

For example, consider a simple FSM that recognizes the language of strings that start with "a" and end with "b". The machine has three states: `q0`, `q1`, and `q2`. The initial state is `q0`, and the accepting state is `q2`. The transitions are as follows:

- From `q0`, if the input is "a," transition to `q1`.
- From `q1`, if the input is any symbol other than "b," stay in `q1`.
- From `q1`, if the input is "b," transition to `q2`.

The machine accepts the input if it reaches state `q2`. If the input does not match the pattern, the machine rejects it. This can be visualized as a directed graph with nodes representing states and edges representing transitions.

![Simple Finite State Machine.](/images/finite-state-machine.svg)

## Regular Expressions and Finite State Machines

Regular expressions can be converted to equivalent finite state machines and vice versa. This connection is known as the [Kleene's Theorem](https://en.wikipedia.org/wiki/Kleene%27s_algorithm). The theorem states that regular expressions and finite state machines are equivalent in terms of expressive power. That is, any regular expression can be represented by a finite state machine, and any finite state machine can be represented by a regular expression.

Let's consider another example. The regular expression `(a|b)*abb` describes the language of strings that start with any number of "a" or "b" characters followed by "abb". We can convert this regular expression to an equivalent finite state machine as follows:

1. Create a state for each character in the regular expression.
2. Add transitions between states based on the regular expression.
3. Mark the final state as the accepting state.

The resulting finite state machine for the regular expression `(a|b)*abb` is shown below:

![Finite State Machine for (a|b)*abb.](/images/finite-state-machine-abb.svg)

Kleene showed that any regular expression can be converted to an equivalent finite state machine using a similar process. Simple regular expressions can be represented deterministically, while more complex expressions may require non-deterministic finite state machines.

### Deterministic vs. Non-deterministic Finite State Machines

A deterministic finite state machine is a machine where each state has exactly one transition for each input symbol. This means that the machine can uniquely determine the next state based on the current state and input symbol. Deterministic machines are easier to implement and analyze but may require more states for complex patterns.

On the other hand, a non-deterministic finite state machine is a machine where a state can have multiple transitions for the same input symbol. This allows the machine to explore multiple paths simultaneously. Non-deterministic finite state machines are more expressive and can represent complex patterns with fewer states, but they are harder to implement and analyze.

## Implementing Regular Expressions with Finite State Machines

Regular expressions are widely used in programming languages and text processing tools. Most modern programming languages provide built-in support for regular expressions through libraries or language features. These libraries typically implement regular expression matching using finite state machines.

When you use a regular expression to match a pattern in a string, the underlying library converts the regular expression to an equivalent finite state machine. The library then processes the input string using the finite state machine to determine if the string matches the pattern described by the regular expression.

## Conclusion

Regular expressions and finite state machines are closely related concepts in computer science. Regular expressions provide a concise and expressive way to describe patterns, while finite state machines offer a formal model for recognizing those patterns. Understanding the connection between the two can help you write more efficient and powerful pattern-matching algorithms. Next time you use a regular expression, remember that it's more than just a string of characters—it's a window into the world of finite state machines.
