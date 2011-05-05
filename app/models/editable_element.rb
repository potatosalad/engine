class EditableElement

    include Mongoid::Document

    ## fields ##
    field :slug
    field :block
    field :default_content
    field :default_attribute
    field :hint
    field :disabled, :type => Boolean, :default => false
    field :assignable, :type => Boolean, :default => true
    field :from_parent, :type => Boolean, :default => false
    field :inherited, :type => Boolean, :default => false
    field :override, :type => Boolean, :default => false

    ## associations ##
    embedded_in :page, :inverse_of => :editable_elements

    ## validations ##
    validates_presence_of :slug

    ## methods ##

    def original?
      !from_parent?
    end

    def override_original?
      override? or original?
    end

    def inherited_editable_element_or_self
      (find_editable_element_from_ancestors if inherited? and not override_original?) || self
    end

    protected

    def find_editable_element_from_ancestors
      return self if self.page.root?
      element = nil
      self.page.ancestors.each do |p|
        el = p.find_editable_element(self.block, self.slug)
        if el.present? and el.override_original?
          element = el
        end
      end
      return element || self
    end

end