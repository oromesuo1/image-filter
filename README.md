# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

A simple app that takes an image URL, filters it and returns the image. The app is hosted on AWS Elastic Beanstalk with the following end point: http://image-filter-dev222.us-east-1.elasticbeanstalk.com When tested with a publicly available image url such as https://s.yimg.com/os/creatr-uploaded-images/2020-11/2ecd3e90-2811-11eb-bf2e-a5ff0cfc4b94 on /filteredimage route with image_url as query parameter, it retrieves the image.

Note that the example url: http://image-filter-dev222.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg is not functional.

Functional url: http://image-filter-dev222.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://s.yimg.com/os/creatr-uploaded-images/2020-11/2ecd3e90-2811-11eb-bf2e-a5ff0cfc4b94
