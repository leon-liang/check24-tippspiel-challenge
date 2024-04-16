module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = var.vpc_name
  azs = var.azs
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets
}