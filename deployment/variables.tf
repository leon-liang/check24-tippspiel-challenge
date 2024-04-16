#### provider Variables defined #######

variable "region" {
  type = string
  description = "Name of the region to select"
  default = "eu-north-1"
}

variable "aws_access_key" {}

variable "aws_secret_key" {}

##### VPC Variables defined #######

variable "vpc_name" {}

variable "azs" {
  type = list(string)
  description = "A list of availability zones"
  default = ["eu-north-1c", "eu-north-1a", "eu-north-1b"]
}

variable "public_subnets" {
  type        = list(string)
  description = "A list of public subnets inside the VPC"
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}
variable "private_subnets" {
  type        = list(string)
  description = "A list of private subnets inside the VPC"
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

##### EkS Cluster Variables defined #######
variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
}