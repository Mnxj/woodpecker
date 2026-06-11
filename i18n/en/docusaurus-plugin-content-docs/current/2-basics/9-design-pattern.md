---
sidebar_position: 8
title: Design Patterns
---


> Frontend perspective.

### Creational Patterns

------

##### Singleton Pattern

A class produces only one instance. `Use case`: modals.

##### Factory Pattern

Defines an interface for creating an object; subclasses decide which class to instantiate. `Use case`: jQuery `$()`.

##### Abstract Factory Pattern

Provides an interface for creating families of related objects. `Use case`: previously I built sequential modals that all share `next`/`prev`, implementing the same interface.

##### Builder Pattern

Separates construction of a complex object from its representation; the same construction process can produce different representations. `Use case`: building complex forms.

##### Prototype Pattern

Create new objects by copying existing ones. `Use case`: deep copy.

### Structural Patterns

------

##### Adapter Pattern

Convert one class's interface into another's. `Use case`: normalizing data into a unified format.

##### Decorator Pattern

Add extra functionality to an object. `Use case`: TS `@expression` decorators.

##### Facade Pattern

Provide a wrapper around a subsystem. A complex UI library exposing a simple, easy-to-use API.

##### Bridge Pattern

Separate abstraction from implementation so they can vary independently. `Use case`: separate the style of a UI component from its behavior.

##### Composite Pattern

Compose objects into tree structures. `Use case`: print a document structure.

##### Flyweight Pattern

Share common icons / share common styles.

##### Proxy Pattern

Control access to an object. `Use case`: image lazy loading.



### Behavioral Patterns

-------

##### Strategy Pattern

Choose different strategies based on different conditions. `Use case`: form validation.

##### Template Method Pattern

Define the skeleton of an algorithm and let subclasses implement certain steps. For example, encapsulating a generic data-fetching flow.

##### Observer Pattern

When one object's state changes, all its dependents are notified. `Use case`: event listeners.

##### Iterator Pattern

Sequentially access elements of an aggregate. `Use case`: array traversal.

##### Visitor Pattern

A new way to access elements of a structure without changing the object. `Use case`: babel plugins.

##### Mediator Pattern

Encapsulate interactions between a set of objects with a mediator. `Use case`: component communication.

##### Chain of Responsibility Pattern

Decouple sender and receiver of a request. For example, form validation, request interception.

##### Command Pattern

Encapsulate a request as an object, allowing parameterization of clients with different requests.

For example, implementing undo/redo.

##### Memento Pattern

Capture and externalize an object's internal state without violating encapsulation, so it can be restored later. For example, saving user input for restoration.

##### State Pattern

Allow an object to alter its behavior when its internal state changes. For example, implementing complex form-validation logic.

##### Interpreter Pattern

Given a language, define a representation of its grammar along with an interpreter that uses the representation to interpret sentences in the language.
