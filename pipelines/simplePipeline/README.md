Openshift Pipelines

This demonstration is a simple introduction to OpenShift Pipelines based on the Tekton open source project. 

Objective

This demonstration can be used to show the methods used to create a pipeline. The tasks are not complex and it should be possible for anyone who has created container images to understand them. The demonstration is not specific to any vertical market and may be of interest to large organisations who are suffering 'Jenkins sprawl' or smalelr organisations who are keen to adopt a cloud-native pipeline.

Demonstration assets

The demonstration makes use of a secondary git repository containing the application code to be built and a dockerfile defining a container image to be produced. This repository is located here : https://github.com/marrober/simple-apps.git and can be used without modification if required. However, if the user wants to demonstrate the triggering capability of OpenShift Pipelines then it is necessary to make a change to the repository files and commit and push the change. For that, the user will need to fork the repository into their own github account. If this happens thenthe gut url needs to be updated in the pipelinerun and (sample) trigger files. If you choose to run this demonstration on demolab then the Git triggering process cannot be used as github cannot reach into demolab to trigger the build.

Setup

Setup 1 - Create the OpenShift Pipeline resources. The resources will be created in an OpenShift project called simple-pipeline. If you wish to change this then clone this repository and update the file in the location : 

Setup 1 - The dockerfile referenced by the build process requires a Node.JS base image from the Red Hat Container catalog. Rather than ask each user to go through the process of setting up a secret in the OpenShift project to gain access to the container catalog, it has been decided that the container image will be imported to an image stream as a one time setup task. 


- Testing - The demonstration should include details of how the user can be assured that it is configured correctly and ready to use.

- Demonstration assets - The content required to deliver the demonstration. This should be organised into a series of numbered and named sub-directories for a multi-part demonstration to enable the user to easily follow the flow. For example :

    acm-demonstration/01-cluster-management
    
    acm-demonstration/02-policy-governance
    
    acm-demonstration/03-application-dpeloyment

It is the authors responsibility to indicate the specific versions of Red Hat solutions for which the demonstration is valid. This does not have to extend to backwards compatibility testing on older versions, but there should be an indication of the version on which it was developed. Product version information should be updated periodically after the author has tested it on a new release.
    
Development work

It is expected that new demonstrations will be developed on an isolated sub-branch from the dev branch. A merge request is then used to deliver the demonstration content to the dev branch. 

