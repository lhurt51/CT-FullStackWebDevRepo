module GarageManagementSystem
  class Garage
    attr_accessor :spots, :vehicles

    def initialize
      @vehicles = []
      @spots = []
    end
  end
end
