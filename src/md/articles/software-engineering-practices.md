---
title: Software engineering daily practices
slug: software-engineering-daily-practices
date: Last Modified
---

Over the last decade and a half, I have found that these daily practices steer my work toward better outcomes.

1. **[Version control](#version-control)**
1. _Trunk-based development (coming soon)_
1. _Test-driven development (coming soon)_
1. _Continuous integration (coming soon)_
1. _Continuous delivery (coming soon)_
1. _Pair programming (coming soon)_

## <a href=#version-control id="version-control">Version control</a>

When I write code, I try to write perfect code the first time, which does exactly what I want it to. But I make mistakes, so I often need to change the code that I already wrote. I change it a lot. It often takes several passes before the code starts to resemble something even close to what it needs to be.

We all make mistakes, right? None of us are perfect, and neither is the code we write. We change it, correct it; refine it. Today we write code, tomorrow we write code, and the next day we write code. As we travel forwards in time, our code is constantly changing and improving.

But sometimes our changes are not improvements. Sometimes we change the code and then find that we made it worse. If only I could travel back in time to before I made that change! I would be able to save myself hours of trying to fix the code back to the state it was in previously before I made that dumb change!

Version control is a time machine for undoing our mistakes. It allows us to freeze the code at any given point. I know my code works right now! So let me hit "save", and no matter what silly mistakes I make next, or tomorrow, or in six months, I know I can always find my way back to where I am now.

This is a critical part of writing any code. I don't care how experienced I am, how educated, or how wonderful I am at writing code. Every time, I will make some kind of mistake, because I'm human. So my first and most import daily practice for doing any kind of software engineering is to use version control.

### Git is a popular version control system

There are several version control systems available for managing the history of your code. In 2024, [Git](https://git-scm.com/) is considered the industry standard.

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
>
> Git is easy to learn and has a tiny footprint with lightning fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.
>
> <cite>[https://git-scm.com/](https://git-scm.com/)</cite>
