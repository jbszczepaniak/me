---
layout: post
title:  "Docker labs - introduction"
date:   2016-01-28 20:00:00 +0100
lang: en
permalink: /en/docker-labs-introduction
featured-image: /assets/docker-introduction/docker_logo.png
---

<p align="justify">
The longer I am tinkering with Docker, the more I realize that it is a tool that every developer wants to know how to use because it is a such facilitation in managing development and deployment environments. At first glance it looks like it is software just like Virtual Machine which gives oportunity to create, configure and manipulate some virtual environments. It has huge advantage over classical Virtual Machine though. All of the features of Docker which makes it worthwhile learning will be showed in comming posts:
</p>

<p align="justify">Let me give you examples where I find Docker particularly useful.</p>
1. Let us assume that company X is developing and maintaining 5 different applications, all of which use different set of libraries. Now, new developer is hired in the company, and he/she has a task to get to know all of the projects to some level. We can have two possible scenarios here:

    1.1. Developers in the company somehow managed to set their environments in order to different projects, and they know what hacks they have to make to switch between those environments. Now, new developer has to learn how to run each project, how to setup different databases, how to install required packages for each project and he/she wastes many hours before he/she can start working on code.

    1.2. Company uses Docker for managing developing environments. New developer is pulling source code from version control system, where he/she finds `Dockerfile`. He/she builds an image from Dockerfile, then runs a Docker container where all of the required dependencies was defined, and can contribute to the project without hours spent on learning how install all dependencies.

2. You are end-to-end testing application and you want to add some records to a database. Each time you run tests, you want start in the fresh state of database. Docker facilitates such scenario for you, all You have to do is to pack your application inside a container. Every time you want to test your application, you simply create new container (with fresh instance of an app), run tests and destroy container.

<p align="justify">
Throughout couple of next posts, I will introduce concepts that will allow You to use Docker with full comprehension of Docker workflow.
</p>
<p align="justify">
Furtherpost posts will be in a form of lab, and You'll be able to run commands along with the post work with Docker by yourself.
</p>
